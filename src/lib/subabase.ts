import { createBrowserClient } from '@supabase/ssr'


export class Config{
static projectUrl: string =  import.meta.env.VITE_PROJECTURL;
static publishableKey =   import.meta.env.VITE_PUBLISHABLEKEY ;
}


if (!Config.projectUrl || !Config.publishableKey) {
  console.log(Config.projectUrl)
  throw new Error("Faltan variables de entorno");
}
export const supabase = createBrowserClient(Config.projectUrl,Config.publishableKey)