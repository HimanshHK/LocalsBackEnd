import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import { Loading, Error, ProductImages, AddToCart, Stars, PageHero } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const { id } = useParams();
  // const history = useHistory();
  const { single_product_loading: loading, single_product_error: error, single_product: product, fetchSingleProduct } = useProductsContext();

  
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    console.log(id);
  }, [id]);

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       history.push('/');
  //     }, 3000);
  //   } 
  // }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error type='single-product' />;
  }

  const { name, price, description, stock, stars, reviews, _id: sku, company, image } = product;

  return (
      <Wrapper>
        <PageHero title={name} product />
        <div className='section section-center page'>
          <Link to='/products' className='btn'>
            back to products
          </Link>
          <div className='product-center'>
            <ProductImages image={image} />
            <section className='content'>
              <h2>{name}</h2>
              <Stars stars={(Math.random() * 5)+1} reviews={Math.floor(Math.random()*200)+1} />
              
              <h5 className='price'>{formatPrice(price)}</h5>
              <p className='desc display-linebreak'>{description}</p>
              <p className='info'>
                <span>Availability : </span>
                {stock > 0 ? `In Stock (${stock})` : 'out of stock'}
              </p>
              <p className='info'>
                <span>SKU : </span>
                {sku}
              </p>

              <p className='info'>
                <span>Brand : </span>
                {company}
              </p>
              <hr />
              {stock > 0 && <AddToCart product={product} />}
            </section>
          </div>
        </div>
      </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .display-linebreak {
    white-space: pre-line;
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
