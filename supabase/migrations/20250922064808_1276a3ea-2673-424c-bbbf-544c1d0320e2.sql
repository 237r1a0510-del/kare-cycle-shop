-- Create function to update timestamps if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add missing columns to orders table for proper customer data storage
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS customer_name TEXT,
ADD COLUMN IF NOT EXISTS customer_email TEXT,
ADD COLUMN IF NOT EXISTS customer_phone TEXT;

-- Create biogas_stations table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.biogas_stations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on biogas_stations
ALTER TABLE public.biogas_stations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Admins can manage biogas stations" ON public.biogas_stations;
DROP POLICY IF EXISTS "Anyone can view biogas stations" ON public.biogas_stations;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- RLS policies for biogas_stations
CREATE POLICY "Admins can manage biogas stations" 
ON public.biogas_stations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() AND users.role = 'admin'
));

CREATE POLICY "Anyone can view biogas stations" 
ON public.biogas_stations 
FOR SELECT 
USING (true);

-- Update orders RLS to allow admins to view all orders
CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() AND users.role = 'admin'
));

-- Add trigger for biogas_stations timestamps
DROP TRIGGER IF EXISTS update_biogas_stations_updated_at ON public.biogas_stations;
CREATE TRIGGER update_biogas_stations_updated_at
BEFORE UPDATE ON public.biogas_stations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();