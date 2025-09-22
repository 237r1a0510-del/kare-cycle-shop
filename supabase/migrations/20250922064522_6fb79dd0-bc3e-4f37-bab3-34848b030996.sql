-- Add missing columns to orders table for proper customer data storage
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS customer_name TEXT,
ADD COLUMN IF NOT EXISTS customer_email TEXT,
ADD COLUMN IF NOT EXISTS customer_phone TEXT;

-- Create refrigerators table for food storage locations
CREATE TABLE public.refrigerators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create biogas_stations table
CREATE TABLE public.biogas_stations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.refrigerators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biogas_stations ENABLE ROW LEVEL SECURITY;

-- RLS policies for refrigerators
CREATE POLICY "Admins can manage refrigerators" 
ON public.refrigerators 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() AND users.role = 'admin'
));

CREATE POLICY "Anyone can view refrigerators" 
ON public.refrigerators 
FOR SELECT 
USING (true);

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

-- Add trigger for updating timestamps
CREATE TRIGGER update_refrigerators_updated_at
BEFORE UPDATE ON public.refrigerators
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_biogas_stations_updated_at
BEFORE UPDATE ON public.biogas_stations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();