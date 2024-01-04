import { useState, useRef, useEffect, KeyboardEvent } from "react"
import {BsYoutube} from 'react-icons/bs'
import "./style.css"
import "crypto"

const KEY = "EMBER_LINKS"

interface Link {
	id: string;
	link: string;
	name?: string
}

const generateId = ():string => crypto.randomUUID().toString().replace("-","")

/*
 * Get data from Local storage
 */
const load = () => {
	const storage = localStorage.getItem(KEY)
	console.log(storage)
	if (storage) {
		return JSON.parse(storage)
	}
	return []
}

export default function App() {
	const [links, setLinks] = useState<Array<Link>>(load())
	const ref = useRef<HTMLInputElement>(null)
	/*
	 * Save the links whenever user enters a new link
	 * @type Hook
	 */
	useEffect(() => {
		localStorage.setItem(KEY, JSON.stringify(links))
	}, [links])
	
	/*
	 * Handle Enter Event and create a new entry
	 * @param KeyboardEvent
	 * @result Save New Link, Reset the Input Box
	 */
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key !== "Enter") return
		if (ref.current == null) return
		if (ref.current?.value.trim() == "") return
		setLinks([...links, {id:generateId(), link: ref.current?.value}])
		ref.current.value = ""
	}

	const convert = (link:string) => {
		/* YouTube */
		let newLink = ''
		let embed = new URL(link)
		newLink += embed.origin
		newLink += '/embed'
		newLink += '/'+embed.searchParams.get('v')
		newLink += "?autoplay=1&mute=1&modestbranding=1"
		console.log(newLink)
		return newLink
	}

	const onClick = (linkId: string) => {
		setLinks(links.filter(link => link.id !== linkId))
	}

	return (
		<main>
			<header className='header'>
				<h1>🔥 EMBER 🔥</h1>
			</header>
			<section className='input'>
				<h2>Links</h2>
				<div className='icons'><BsYoutube /></div>
				<input ref={ref} type="text" onKeyDown={onKeyDown} placeholder={"https://youtube.com/watch?v=vIdeO_COdE_132"}/>
			</section>
			<section className="links">
				{links.map(link => (
					<div key={link.id} className="link">
						<iframe
							id={link.id}
							src={convert(link.link)}
							title={link.name?link.name:""}
							allowFullScreen
							allow="autoplay"
						>
						</iframe>
						<div>
							<button className='button' onClick={() => onClick(link.id)}>CLOSE</button>
						</div>
					</div>
				))}
			</section>
		</main>
	)
}
