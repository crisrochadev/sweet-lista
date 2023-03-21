import Localbase from 'localbase';
const db = new Localbase('list');

console.log(db)

export function useDatabase(){
  return db
}
