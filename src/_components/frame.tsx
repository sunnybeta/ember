interface FrameProps {
	id: string;
	src: string;
	onClick: (linkId: string) => void;
}

export default function Frame({id, src, onClick}: FrameProps) {
	return (
		<div className="link">
			<iframe
				id={id}
				src={src}
				title={""}
				allowFullScreen
				allow="autoplay"
			>
			</iframe>
			<div>
				<button className='button' onClick={() => onClick(id)}>CLOSE</button>
			</div>
		</div>
	)
}
