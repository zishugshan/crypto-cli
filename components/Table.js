const React = require('react');

const { useState, useEffect } = React;
// Destructuring useState and useEffect from React

const { Box, Text, Newline } = require('ink');
// Destructuring the components we need from ink

const Gradient = require('ink-gradient');

const BigText = require('ink-big-text');

const axios = require('axios');


const url_coins = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Clitecoin%2Cmatic-network%2Cethereum%2Ctether%2Cbinancecoin%2Csolana%2Caave%2Ccardano%2Ctron&order=market_cap_desc&per_page=100&page=1&sparkline=false'

//const url-allnews = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d5a711002c0c4c289f67847690ba8668'
const url_news = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=d5a711002c0c4c289f67847690ba8668'


const Table = () => {

    const [newsdata, setNewsdata] = useState([]);

    useEffect(()=>{
        axios.get(url_news)
        .then(response => setNewsdata(response.data.articles))
        .catch(e => console.log(e));
    },[]);

    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get(url_coins)
        .then(response => setData(response.data))
        .catch(e => console.log(e));
    },[]);

    //data.sort((x,y) => {return y.current_price  - x.current_price})
    data.sort((x,y) => {return y.price_change_percentage_24h  - x.price_change_percentage_24h})
    return (
  <Box borderStyle='double' flexDirection='column' padding={1}>
        <Box borderStyle='single' padding={1}>
            {
                data.length === 0 ?
                <Box>
                    <Text>Loading Coins...</Text>
                </Box> :
                <Box flexDirection='column'>
                    <Box>
                        <Box width='25%'><Text>COIN</Text></Box>
                        <Box width='25%'><Text>CURRENT PRICE (USD)</Text></Box>
                        <Box width='25%'><Text>24 HOUR CHANGE</Text></Box>
                        <Box width='25%'><Text>ALL TIME HIGH</Text></Box>
                    </Box>
                    <Newline/>
                    {
                        data.map(({id, name, current_price, price_change_percentage_24h, ath}) => (
                            <Box key={id}>
                                <Box width='25%'>
                                    <Text>{name}</Text>
                                </Box>
                                <Box width='25%'>
                                    <Text color='cyan'>{'$' + current_price.toLocaleString()}</Text>
                                </Box>
                                <Box width='25%'>
                                    <Text backgroundColor={Math.sign(price_change_percentage_24h) < 0 ? 'red' : 'green'}>
                                        {price_change_percentage_24h.toFixed(2) + '%'}
                                    </Text>
                                </Box>
                                <Box width='25%'>
                                    <Text color='green'>{'$' + ath.toLocaleString()}</Text>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            }
        </Box>


        <Box borderStyle='single' padding={1}>
            {
                newsdata.length === 0 ?
                <Box>
                    <Text>News Loading ...</Text>
                </Box> :
                <Box flexDirection='column'>
                    <Box borderStyle='single' padding={1}>
                        <Gradient name="summer">
                            <BigText 
                                text="Top Crypto News" 
                                align='center' 
                                font='chrome'
                            />
                        </Gradient>
                    </Box>
                    <Newline/>
                    {
                        newsdata.map(({id, description }) => (
                            <Box borderStyle='single' padding={1}>
                                <Box key={id}>
                                    
                                    <Box width='100%'>
                                        <Text color='red'>{description}</Text>
                                    </Box>
                                   
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            }
        </Box>
    </Box>
    )
}

module.exports = Table;