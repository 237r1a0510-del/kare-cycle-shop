import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPTS = {
  en: `You are a helpful assistant for EcoHarvest, an eco-friendly product marketplace and sustainability platform. 
  Help users with:
  - Product information about eco-friendly items
  - Sustainability tips and advice
  - Information about waste reduction and environmental impact
  - General questions about eco-friendly living
  
  Keep responses concise, helpful, and focused on sustainability. If you don't know something specific about a product, suggest they browse the shop or contact support.`,
  
  hi: `आप EcoHarvest के लिए एक सहायक सहायक हैं, जो एक पर्यावरण-अनुकूल उत्पाद बाज़ार और स्थिरता मंच है।
  उपयोगकर्ताओं की सहायता करें:
  - पर्यावरण-अनुकूल वस्तुओं के बारे में उत्पाद की जानकारी
  - स्थिरता के सुझाव और सलाह
  - अपशिष्ट कमी और पर्यावरणीय प्रभाव के बारे में जानकारी
  - पर्यावरण-अनुकूल जीवन के बारे में सामान्य प्रश्न
  
  प्रतिक्रियाएं संक्षिप्त, सहायक और स्थिरता पर केंद्रित रखें।`,
  
  es: `Eres un asistente útil para EcoHarvest, un mercado de productos ecológicos y plataforma de sostenibilidad.
  Ayuda a los usuarios con:
  - Información sobre productos ecológicos
  - Consejos y recomendaciones de sostenibilidad
  - Información sobre reducción de residuos e impacto ambiental
  - Preguntas generales sobre vida ecológica
  
  Mantén las respuestas concisas, útiles y centradas en la sostenibilidad.`
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'en' } = await req.json();
    
    console.log('Received message:', message, 'Language:', language);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = SYSTEM_PROMPTS[language as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.en;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-bot function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process chat message',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});