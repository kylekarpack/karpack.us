module.exports = {
  siteMetadata: {
    title: "Karpack.us",
    author: "Kyle & Kristin Karpack",
    description: "The professional home page for Kyle and Kristin Karpack",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
  ],
};
