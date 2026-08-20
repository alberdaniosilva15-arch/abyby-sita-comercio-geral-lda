import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('Testing insert...');
  const { data, error } = await supabase.from('recruitment_jobs').insert([{
    title: "Crane operator",
    type: "Offshore",
    area: "operador de grua offshore nivel 3",
    experience_level: "nivel 3",
    location: "Bloco 13",
    shift_type: "Turno",
    short_description: "TESTE555",
    full_description: "precisaos de um operador",
    responsibilities: ["saber trabalhar em grupo"],
    requirements: ["saber as normas do swl"],
    certifications: ["ISO"],
    is_active: true
  }]).select();

  if (error) {
    console.error('Insert failed:', error);
  } else {
    console.log('Insert succeeded:', data);
  }
}

testInsert();
