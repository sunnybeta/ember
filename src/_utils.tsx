/* 
 * Generate a random string ID
 */
export const generateId = () => crypto.randomUUID().toString().replace("-","")

/*
 * Convert YouTube URLs to the embeddable URLs
 * https://youtu.be/38dfj190 => https://youtube.com/embed/38dfj190
 * https://youtube.com/watch?v=38dfj190&... => https://youtube.com/embed/38dfj190
 * @param link: string
 * @returns (Embeddable URL: string | null)
 */
export const convert = (link:string):string|null => {
	const base = "https://youtube.com/embed/"
	const queryParams = "/?autoplay=1&mute=1&modestbranding=1"
	try {
		let embed = new URL(link)
		if (link.includes('youtube.com')) {
			return `${base}${embed.searchParams.get('v')}${queryParams}`
		} else if (link.includes('youtu.be')) {
			return `${base}${embed.pathname}${queryParams}`
		} else {
			return null
		}
	} catch(err) {
		return null
	}
}
