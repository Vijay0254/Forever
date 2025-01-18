import React from 'react'
import uploadImg from '../assets/upload_area.png'
import { useState } from 'react'
import axios from '../utils/Axios'
import { toast } from 'react-toastify';

const Add = () => {

    const [image1, setimage1] = useState(false)
    const [image2, setimage2] = useState(false)
    const [image3, setimage3] = useState(false)
    const [image4, setimage4] = useState(false)

    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [category, setcategory] = useState("Men")
    const [subCategory, setsubCategory] = useState("Topwear")
    const [bestseller, setbestseller] = useState(false)
    const [sizes, setsizes] = useState([])

    async function handleAddProducts(event){
        event.preventDefault()
        try{
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('subCategory', subCategory)
            formData.append('bestseller', bestseller)
            formData.append('sizes', JSON.stringify(sizes))

            image1 && formData.append('image1', image1)
            image2 && formData.append('image2', image2)
            image3 && formData.append('image3', image3)
            image4 && formData.append('image4', image4)

            const response = await axios.post(`/api/product/add`, formData, {withCredentials: true})
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                toast.warn(`${response.data.message}!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            if(response.data.success){
                setname("")
                setdescription("")
                setprice("")
                setbestseller(false)
                setsizes([])
                setcategory("Men")
                setsubCategory("Topwear")
                setimage1(false)
                setimage3(false)
                setimage2(false)
                setimage4(false)
                toast.success(`${response.data.message}!!!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }            
        }
        catch(err){
            console.log(`Error in Handle Add Product - ${err}`)
        }
    }
 
  return (
    <form className='flex flex-col w-full items-start gap-3' onSubmit={() =>handleAddProducts(event)}>
        <div>
            <p className='mb-2'>Upload Image</p>

            <div className='flex gap-2'>
                <label htmlFor="image1" className='cursor-pointer'>
                    <img className='w-20' src={image1 ? URL.createObjectURL(image1) : uploadImg} alt="uploadImg" />
                    <input onChange={(event) =>setimage1(event.target.files[0])} type="file" name='image1' id='image1' hidden />
                </label>
                <label htmlFor="image2" className='cursor-pointer'>
                    <img className='w-20' src={image2 ? URL.createObjectURL(image2) : uploadImg} alt="uploadImg" />
                    <input onChange={(event) =>setimage2(event.target.files[0])} type="file" name='image2' id='image2' hidden />
                </label>
                <label htmlFor="image3" className='cursor-pointer'>
                    <img className='w-20' src={image3 ? URL.createObjectURL(image3) : uploadImg} alt="uploadImg" />
                    <input onChange={(event) =>setimage3(event.target.files[0])} type="file" name='image3' id='image3' hidden />
                </label>
                <label htmlFor="image4" className='cursor-pointer'>
                    <img className='w-20' src={image4 ? URL.createObjectURL(image4) : uploadImg} alt="uploadImg" />
                    <input onChange={(event) =>setimage4(event.target.files[0])} type="file" name='image4' id='image4' hidden />
                </label>
            </div>
        </div>

        <div className='w-full'>
            <p className='mb-2'>Product Name</p>
            <input value={name} onChange={(event) =>setname(event.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        <div className='w-full'>
            <p className='mb-2'>Product Description</p>
            <textarea value={description} onChange={(event) =>setdescription(event.target.value)} className='w-full resize-none max-w-[500px] px-3 py-2' rows={4} type="text" placeholder='Type here' required />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 items-center'>
            <div>
                <p className='mb-2'>Category</p>
                <select value={category} onChange={(event) =>setcategory(event.target.value)} className='w-full px-3 py-2'>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>

            <div>
                <p className='mb-2'>Sub Category</p>
                <select value={subCategory} onChange={(event) =>setsubCategory(event.target.value)} className='w-full px-3 py-2'>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                </select>
            </div>

            <div>
                <p className='mb-2'>Price</p>
                <input value={price} onChange={(event) =>setprice(event.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="number" min={0} placeholder='Enter price' />
            </div>
        </div>

        <div>
            <p className='mb-2'>Sizes</p>
            <div className='flex gap-3'>
                <div onClick={() =>setsizes((prev) =>prev.includes("S") ? prev.filter((element) =>element != "S") : [...prev, 'S'])}>
                    <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                </div>
                <div onClick={() =>setsizes((prev) =>prev.includes("M") ? prev.filter((element) =>element != "M") : [...prev, 'M'])}>
                    <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                </div>
                <div onClick={() =>setsizes((prev) =>prev.includes("L") ? prev.filter((element) =>element != "L") : [...prev, 'L'])}>
                    <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                </div>
                <div onClick={() =>setsizes((prev) =>prev.includes("XL") ? prev.filter((element) =>element != "XL") : [...prev, 'XL'])}>
                    <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                </div>
                <div onClick={() =>setsizes((prev) =>prev.includes("XXL") ? prev.filter((element) =>element != "XXL") : [...prev, 'XXL'])}>
                    <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                </div>
            </div>
        </div>

        <div className='flex gap-2 mt-2'>
            <input onChange={() =>setbestseller(prev =>!prev)} checked={bestseller} type="checkbox" name="bestseller" id="bestseller" />
            <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
        </div>

        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add