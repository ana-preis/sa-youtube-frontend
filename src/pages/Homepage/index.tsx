
import React from "react";
import BigLogoCard from "../../components/BigLogoCard";
import RowCategory from "../../components/RowCategory";
import PageBase from "../../layouts/PageBase";

function Homepage() {
    return (
        <PageBase>
            <RowCategory />
            <BigLogoCard />
        </PageBase>

    );
}

export default Homepage;