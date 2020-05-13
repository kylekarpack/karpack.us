import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import BackgroundImage from "gatsby-background-image";

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
        <div id="bg"></div>
      </div>
    </Layout>
  );
}

export default IndexPage;
