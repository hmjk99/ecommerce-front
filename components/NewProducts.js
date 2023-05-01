import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function NewProducts({airpodsPro, airpodsMax, macbook}) {
    const {addProducts} = useContext(CartContext)
    console.log(airpodsPro);
    return (
        <div id="latest">
            <div className="home white" >
                {macbook.map(m => (
                    <>
                    <h1>{m?.title}</h1>
                    <div className="home-buttons">
                        <Link href={'/products/'+m?._id}><button>Learn More &gt;</button></Link>
                        <button onClick={()=> addProducts(m?._id)}>Buy &gt;</button>
                    </div>
                    <img className="latest-img1" src={m?.images[0]}/>
                    </>
                ))}
            </div>
            <div className="home" >
                {airpodsMax.map(max => (
                    <>
                    <h1>{max?.title}</h1>
                    <div className="home-buttons">
                        <Link href={'/products/'+max?._id}><button>Learn More &gt;</button></Link>
                        <button onClick={()=> addProducts(max?._id)}>Buy &gt;</button>
                    </div>
                    <img className="latest-img2" src={max?.images[0]}/>
                    </>
                ))}
            </div>
            <div className="home white" >
                {airpodsPro.map(a => (
                    <>
                    <h1>{a?.title}</h1>
                    <div className="home-buttons">
                        <Link href={'/products/'+a?._id}><button>Learn More &gt;</button></Link>
                        <button onClick={()=> addProducts(a?._id)}>Buy &gt;</button>
                    </div>
                    <img className="latest-img3" src={a?.images[0]}/>
                    </>
                ))}
            </div>
        </div>
    )
}