import "crypto"
import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { ToastContainer, toast} from 'react-toastify'
import { generateId, convert } from "./_utils"
import {BsYoutube} from 'react-icons/bs'
import Frame from './_components/frame'
import 'react-toastify/ReactToastify.css'
import "./style.css"


const KEY = "EMBER_LINKS"

/*
 * Get data from Local storage
 */
const load = () => {
	const storage = localStorage.getItem(KEY)
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
		const url = ref.current?.value.trim()
		if (url == "") return
		const embeddedUrl = convert(url)
		if (embeddedUrl) {
			setLinks([...links, {id:generateId(), url: ref.current?.value, embeddedUrl:embeddedUrl}])
			ref.current.value = ""
		} else {
			toast("Please enter a valid URL", {theme:'dark'})
		}
	}

	/* Close the video player on button click */
	const onClick = (linkId: string) => {
		setLinks(links.filter(link => link.id !== linkId))
	}
	return (
		<main>
			<ToastContainer/>
			<header className='header'>
				<h1>🔥 EMBER 🔥</h1>
			</header>
			<section className='input'>
				<h2>Links</h2>
				<div className='icons'><BsYoutube /></div>
				<input ref={ref} type="text" onKeyDown={onKeyDown} placeholder={"https://youtube.com/watch?v=... or https://youtu.be/..."}/>
			</section>
			<section className="links">
				{links.map(link => (
					<Frame
					id={link.id}
					src={link.embeddedUrl}
					onClick={onClick}
					/>
				))}
			</section>
		</main>
	)
}
