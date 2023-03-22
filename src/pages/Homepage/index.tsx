
import React from "react";
import Header from "../../components/Header";
import Footer from '../../components/Footer'
import BigLogoCard from "../../components/BigLogoCard";
import RowCategory from "../../components/RowCategory";

function Homepage() {
    return (
        <>
            <Header></Header>
            <RowCategory />
            <BigLogoCard />
            <Footer/>
        </>
    )
}

export default Homepage;