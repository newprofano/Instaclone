import React,{useState,useEffect, useCallback} from 'react';
import {View, FlatList} from 'react-native';


import {Post, Header, Avatar, Name, Description, Loading} from './styles'

import LazyImage from '../../components/LazyImage'

export default function Feed(){

    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    

    async function loadPage(pageNumber =page, shouldRefresh = false){
        if( total &&  pageNumber >total) return;

        setLoading(true);

        const response = await fetch(`http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`);
                    
        const data = await response.json();
        const totalItems = response.headers.get("X-Total-Count")

        setTotal(Math.floor(totalItems/5))
        setFeed(shouldRefresh ? data: [...feed, ...data]);
        setPage(pageNumber +1);
        setLoading(false);
    }

    useEffect(()=>{
        
        loadPage(); 
    },[])

    function refreshList(){
        setRefreshing(true);
        loadPage(1, true);
        setRefreshing(false);
    }
    
    return(
        <View>
            <FlatList
                data= {feed}
                keyExtractor={post=>{String(post.id)}}
                onEndReached={()=>loadPage()}
                ListFooterComponent={loading && <Loading/>}
                onEndReachedThreshold={0.1}
                onRefresh={refreshList}
                
                refreshing={refreshing}
                renderItem={({item})=>(
                    <Post>
                        <Header>
                            <Avatar source={{uri: item.author.avatar}}/>
                            <Name>{item.author.name}</Name>
                        </Header>
                        <LazyImage 
                        aspectRatio={item.aspectRatio}
                        smallSource={{uri: item.small}}
                        source={{uri: item.image}}
                        />
                        <Description>
                        <Name>{item.author.name} {item.description}</Name>
                        </Description>
                    </Post>

                )}
            />
        </View>
    )
}