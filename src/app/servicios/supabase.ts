import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class Supabase{
  
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
  'https://tmywwtuulwjsqfyzcrhb.supabase.co',
  'sb_publishable_4ExbwyLySCCUNn-iY2pvBw_dsYd1VRb'
  );
}


  async getTurnos () {
    const { data, error } = await this.supabase.from('turnos').select('*');
    if (error) { console.error(error); return null; }
    return data;
  }

  async agregarTurno(turno: any) {
    const  { data, error } = await this.supabase.from('turnos').insert(turno).select().single();
    if (error) { console.error(error);  return null; }
    return data;
  }

  async editarTurno(id: number, cambios: any) {
    const { error } = await this.supabase.from('turnos').update(cambios).eq('id', id);
    if (error) console.error(error);
  }

  async actualizarEstado(id: number, estado: string) {
    const { error } = await this.supabase.from('turnos').update({ estado }).eq('id', id);
    if (error) console.error(error);
  }


}
