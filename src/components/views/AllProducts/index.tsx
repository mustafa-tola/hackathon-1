"use client";
import BASE_PATH_FOR_API from "@/components/shared/BasePath";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { Component } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from "../Card";

interface propsType {
    productArray: Array<oneProductType>
}

export default class AllProductsComponent extends Component<{ ProductData: propsType }> {
    start: number = 10;
    end: number = 20;
    state: { items: Array<oneProductType>, hasMore: boolean } = {
        items: [...this.props.ProductData.productArray],
        hasMore: true
    }
    fetchDataFromApiGradually = async (start: number, end: number) => {
        const res = await fetch(`${BASE_PATH_FOR_API}/api/products?start=${start}&end=${end}`);
        let dataToCheckAndSend = await res.json();
        if (dataToCheckAndSend.productArray == "Not Found") {
            this.setState({
                hasMore: false
            })
        }
        return dataToCheckAndSend;
    }
    getData = async () => {
        let allTogether = await this.fetchDataFromApiGradually(this.start, this.end);
        if (allTogether.productArray !== "Not Found") {
            this.setState({
                items: this.state.items.concat()
            })
        }
        else {
            this.setState({
                hasMore: false
            })
        }
        this.start += 10;
        this.end += 10;
        console.log(this.props.ProductData.productArray[0].price);
        console.log(this.props.ProductData);
    }
    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.getData}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                className="content-center place-items-center justify-center grid grid-cols-1 md:grid-cols-2 py-10 lg:grid-cols-3 gap-4"
            >
                {this.state.items.map((item: oneProductType, index: number) => (
                    <Card singleProductData={item} />
                ))}
            </InfiniteScroll>
        )
    }
}