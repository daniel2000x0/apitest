import { createBrowserClient } from '@supabase/ssr'


export class Config{
static projectUrl: string =  import.meta.env.VITEPROJECTURL;
static publishableKey =   import.meta.env.VITEPUBLISHABLEKEY ;
}


if (!Config.projectUrl || !Config.publishableKey) {
  console.log(Config.projectUrl)
  throw new Error("Faltan variables de entorno");
}
export const supabase = createBrowserClient(Config.projectUrl,Config.publishableKey)