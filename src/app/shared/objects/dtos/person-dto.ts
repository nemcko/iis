/* struktura pouzita pri definovani pristupovych prav
 * personFN - full name
 * personUN - user name v kanonickom tvare CN=.../OU=...
 * personID - osobne cislo zamestnanca
 */ 
export interface IPerson {
  personFN: string,
  personUN?: string,
  personID?: string
}
