import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/layout";
import Main from "../components/Main";

let wrapperRef;

const initialState = {
  isArticleVisible: false,
  timeout: false,
  articleTimeout: false,
  article: "",
  loading: false,
};

function IndexPage(props) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const background = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "bg.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 20) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);

  const setWrapperRef = node => {
    wrapperRef = node;
  };

  const handleOpenArticle = article => {
    setState(stateRef => ({
      ...stateRef,
      isArticleVisible: true,
      article,
    }));

    setTimeout(() => {
      setState(stateRef => ({
        ...stateRef,
        timeout: !stateRef.timeout,
      }));
    }, 325);

    setTimeout(() => {
      setState(stateRef => ({
        ...stateRef,
        articleTimeout: !stateRef.articleTimeout,
      }));
    }, 350);
  };

  const handleCloseArticle = () => {
    setState(stateRef => ({
      ...stateRef,
      articleTimeout: !stateRef.articleTimeout,
    }));

    setTimeout(() => {
      setState(stateRef => ({
        ...stateRef,
        timeout: !stateRef.timeout,
      }));
    }, 325);

    setTimeout(() => {
      setState(stateRef => ({
        ...stateRef,
        isArticleVisible: !stateRef.isArticleVisible,
        article: "",
      }));
    }, 350);
  };

  const handleClickOutside = event => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      if (state.isArticleVisible) {
        handleCloseArticle();
      }
    }
  };

  return (
    <Layout location={props.location}>
      <div
        className={`body ${state.loading} ${
          state.isArticleVisible ? "is-article-visible" : ""
        }`}>
        <div id="wrapper">
          <Header
            onOpenArticle={key => {
              handleOpenArticle(key);
            }}
            timeout={state.timeout}
          />
          <Main
            isArticleVisible={state.isArticleVisible}
            timeout={state.timeout}
            articleTimeout={state.articleTimeout}
            article={state.article}
            onCloseArticle={handleCloseArticle}
            setWrapperRef={setWrapperRef}
          />
          <Footer timeout={state.timeout} />
        </div>
        <div id="bg">
          <BackgroundImage
						id="main-bg"
            fluid={background.file?.childImageSharp?.fluid}
            backgroundColor={`#040e18`}
          />
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;
