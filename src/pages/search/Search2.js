import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Container, Grid, Typography } from '@mui/material';
import { TrendingUp, Star } from '@mui/icons-material';
import dummyImage from '../../images/cat.jpg';

const Search2 = () => {
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search).get('tag');
    const [originalProducts, setOriginalProducts] = useState([]);
    const [activeFilter, setActiveFilter] = useState(searchParam || '');

    const handleFilterClick = (tag) => {
        setActiveFilter(tag);
    };

    useEffect(() => {
        const fetchOriginalProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/shop');
                if (response.ok) {
                    const { data } = await response.json();
                    let filteredProducts = data;

                    if (activeFilter === 'trend') {
                        filteredProducts = data.filter(product => product.is_product_of_the_week);
                    } else if (activeFilter === 'most-saled') {
                        filteredProducts = data.filter(product => product.is_most_saled);
                    }

                    setOriginalProducts(filteredProducts);
                } else {
                    throw new Error('An error occurred while fetching original products');
                }
            } catch (error) {
                console.error('Error fetching original products:', error);
            }
        };

        fetchOriginalProducts();
    }, [activeFilter]);

    return (
        <Container>
            {/* Filter Buttons */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button
                        variant={activeFilter === 'trend' ? 'contained' : 'outlined'}
                        onClick={() => handleFilterClick('trend')}
                        startIcon={<TrendingUp />}
                    >
                        Haftanın ürünleri
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant={activeFilter === 'most-saled' ? 'contained' : 'outlined'}
                        onClick={() => handleFilterClick('most-saled')}
                        startIcon={<Star />}
                    >
                        Çok satan ürünler
                    </Button>
                </Grid>
                {/* Add other buttons here */}
            </Grid>

            {/* Render Filtered Products */}
            <Grid container spacing={3}>
                {originalProducts.map(product => (
                    <Grid item key={product.product_id} xs={12} sm={6} md={4} lg={3}>
                        <div>
                            {/* Render product details */}
                            <img src={dummyImage} alt="Product" />
                            <Typography variant="h6">{product.product_name}</Typography>
                            <Typography>{product.description}</Typography>
                            <Typography variant="subtitle1">Price: {product.price}</Typography>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Search2;
