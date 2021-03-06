import {useRouter} from "next/router"

function Product({ product }) {

  const router = useRouter()

  if(router.isFallback){
    return <h1>Loading</h1>
  }

    return (
      <>
        <h2>
          {product.id} {product.title} {product.price}
        </h2>
        <p>{product.description}</p>
      </>
    )
  }
  
  export default Product
  
  export async function getStaticProps(context) {
    console.log("Statically generating productID page")
    const { params } = context
    const response = await fetch(
      `http://localhost:4000/products/${params.productId}`
    )
    const data = await response.json()
    
    return {
      props: {
        product: data
      },
      revalidate: 30,
    }
  }
  
  export async function getStaticPaths() {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()
    // const paths = data.map(post => {
    //   return {
    //     params: { postId: `${post.id}` }
    //   }
    // })
  
    return {
      paths: [
        { params: { productId: '1' } },
    ],
      // paths,
      fallback: true
    }
  }
  