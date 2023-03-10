import translate from '@vitalets/google-translate-api'
import { Anime } from "@shineiichijo/marika"
const client = new Anime();
let handler = async(m, { conn, text, usedPrefix }) => {
if (!text) return m.reply(`*[βππππβ] INGRESE EL NOMBRE DE ALGUN ANIME A BUSCAR*`)
try {  
let anime = await client.searchAnime(text)
let result = anime.data[0];
let resultes = await translate(`${result.background}`, { to: 'es', autoCorrect: true })   
let resultes2 = await translate(`${result.synopsis}`, { to: 'es', autoCorrect: true })   
let AnimeInfo = `
π β’ *TΓ­tulo:* ${result.title}
π β’ *Formato:* ${result.type}
π β’ *Estado:* ${result.status.toUpperCase().replace(/\_/g, " ")}
π₯ β’ *Episodios totales:* ${result.episodes}
π β’ *DuraciΓ³n: ${result.duration}*
β¨ β’ *Basado en:* ${result.source.toUpperCase()}
π« β’ *Estrenado:* ${result.aired.from}
π β’ *Finalizado:* ${result.aired.to}
π β’ *Popularidad:* ${result.popularity}
π β’ *Favoritos:* ${result.favorites}
π β’ *ClasificaciΓ³n:* ${result.rating}
π β’ *Rango:* ${result.rank}
β¦ β’ *Trailer:* ${result.trailer.url}
π β’ *URL:* ${result.url}
π β’ *Background:* ${resultes.text}
β β’ *Ringkasan:* ${resultes2.text}`
conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m)
} catch {
throw `*[β] ERROR, INTENTELO DE NUEVO*`  
}}
handler.command = /^(anime|animeinfo)$/i
export default handler 
