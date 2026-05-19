import { cleanFileUrl } from "../../../@utils/cleanFileUrl";

const welcomeSpeech: HomeSection = {
    title: "Sambutan Kepala Desa",
    post_by: "Haryanto SE",
    post_by_title: "Kepala Desa Sejahtera",
    post_content: "Website ini hadir sebagai wujud transformasi desa Sejahtera menjadi desa yang mampu memanfaatkan teknologi informasi dan komunikasi, terintegrasi kedalam sistem online. Keterbukaan informasi publik, pelayanan publik dan kegiatan perekonomian di desa, guna mewujudkan desa Kersik sebagai desa wisata yang berkelanjutan, adaptasi dan mitigasi terhadap perubahan iklim serta menjadi desa yang mandiri. \n Terima kasih kepada semua pihak yang telah banyak memberi dukungan dan kontribusi baik berupa tenaga, pikiran dan semangat, sehingga website ini dapat terealisasi.",
    image: "sambutan_kepala_desa.png"
}

function WelcomeSpeechComponent() {
    return (
        <div className="w-full" >
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-8 lg:gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                            <div className="w-full lg:max-w-lg lg:flex-auto">
                                <img
                                    alt={welcomeSpeech.title}
                                    src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, welcomeSpeech.image ?? '')}
                                    className="aspect-6/5 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 lg:aspect-auto lg:h-80 dark:outline-white/10"
                                />
                            </div>
                            <div className="w-full lg:max-w-xl lg:flex-auto text-center lg:text-left">
                                <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                                    {welcomeSpeech.title}
                                </h2>
                                <div className="mt-2 text-gray-600 dark:text-gray-300">
                                    <div className="text-xl font-semibold">{welcomeSpeech.post_by}</div>
                                    <div>{welcomeSpeech.post_by_title}</div>
                                </div>
                                <p className="mt-6 lg:text-xl/8 text-gray-600 dark:text-gray-300">
                                    {welcomeSpeech.post_content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeSpeechComponent;