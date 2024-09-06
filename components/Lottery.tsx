import Image from "next/image";

export default function Lottery () {
    return (
        <div className="overflow-y-auto max-h-80 p-4 shadow-lg max-w-lg w-full rounded-2xl border bg-gray-100 border-gray-200 font-mono custom-scroll">
            <Image src="/coming-soon.jpeg" alt="Ticker Lottery Game" width={1312} height={736} priority />
        </div>
    )
}