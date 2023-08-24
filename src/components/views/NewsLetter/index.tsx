const NewsLetter = () => {
    return (
        <div className="relative text-center space-y-4 min-h-[40vh] md:h-[80vh] lg:min-h-[50rem] flex flex-col justify-center items-center text-gray-800">
            <h6 className="absolute md:text-[9rem] font-bold text-gray-200 text-center mx-auto z-50">Newsletter</h6>
            <h6 className="text-2xl md:text-4xl font-bold">NewsLetter</h6>
            <p className="max-w-[16rem] text-lg font-medium">Get the latest information and promotion offers directly</p>
            <div className="flex gap-4 flex-wrap items-center justify-center">
                <input type="text" className="border border-gray-600 md:py-1 px-2 md:px-4 flex flex-grow w-80" placeholder="Email Address"/>
                <button className="bg-gray-900 border-gray-500 text-white border px-4 py-2">Get Started</button>
            </div>
        </div>
    )
}

export default NewsLetter;