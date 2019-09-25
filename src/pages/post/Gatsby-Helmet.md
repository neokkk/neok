---
title: "gatsby-helmet으로 검색 엔진 최적화하기"
date: "2019-09-25"
---

배포 후 수정 할 부분들이 많이 보인다.
<br>
우선 구글에 검색했을 때 블로그가 뜨지 않아서 왜 그런가 했더니 meta 데이터가 없어서인 듯 하다.
<br>
html head 태그 내부에 작성하는 meta 태그는 홈페이지를 설명하는 태그라고 보면 된다.
<br>
동적으로 head 내용을 변경해주는 helmet을 이용해 최적화를 해보고자 한다.
<br>
gatsby는 기본적으로 react를 지원하기 때문에 **[react-helmet]("https://github.com/nfl/react-helmet#example", react-helmet docs link)**과 **gatsby-plugin-react-helmet** 패키지를 받으면 된다.
<br>
<br>

````
    npm install --save gatsby-plugin-react-helmet react-helmet
````

<br>
<br>
그리고 gatsby-config.js 파일에 해당 플러그인을 추가해주자.
<br>
<br>

````
    {
        plugins: [`gatsby-plugin-react-helmet`]
    }
````

<br>
<br>
기본적으로 helmet을 사용하는 방법은 다음과 같다.
<br>
<br>

````
    import React from "react"
    import { Helmet } from "react-helmet"

    const Application = () => {
        return (
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>My Title</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            </div>
        );
    }

````

<br>
<br>
helmet 태그 내부에 작성하고 싶은 head 내용을 작성하면 된다. 
<br>
위와 같이 따로 작성해도 되지만, 컴포넌트로 구성해 재사용하는게 좋을 것 같다. 
<br>
gatsby-config.js에 홈페이지 정보를 저장하고 필요할 때 graphql을 이용해 불러올 수 있다.
<br>
<br>

````
    // gatsby-config.js

    module.exports = {
        siteMetadata: {
            title: "Severus Snape",
            titleTemplate: "%s · The Real Hero",
            description: "Hogwarts Potions master, Head of Slytherin house and former Death Eater.",
            url: "https://www.doe.com", // No trailing slash allowed!
            image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
            twitterUsername: "@occlumency",
        },
    }
````
<br>
<br>
SEO 컴포넌트를 만들어주자.
<br>
gatsby에서 제공하는 staticQuery 태그를 이용해 graphql로 불러온 데이터를 render시키면 된다.
<br>
gatsby에서 제공하는 기본 틀은 아래와 같다.
<br>
<br>

````
    import React from "react"
    import { Helmet } from "react-helmet"
    import { StaticQuery, graphql } from "gatsby"

    const SEO = ({ title, description, image, pathname, article }) => (
        <StaticQuery query={query} render={({
            site: {
                siteMetadata: {
                    defaultTitle,
                    titleTemplate,
                    defaultDescription,
                    siteUrl,
                    defaultImage,
                }
            }
        }) => {
            const seo = {
                title: title || defaultTitle,
                description: description || defaultDescription,
                image: `${siteUrl}${image || defaultImage}`,
                url: `${siteUrl}${pathname || "/"}`,
            }

            return (
                <>
                    <Helmet title={seo.title} titleTemplate={titleTemplate}>
                        <meta name="description" content={seo.description} />
                        <meta name="image" content={seo.image} />
                        {seo.url && <meta property="og:url" content={seo.url} />}
                        {(article ? true : null) && (
                            <meta property="og:type" content="article" />
                        )}
                        {seo.title && <meta property="og:title" content={seo.title} />}
                        {seo.description && (
                            <meta property="og:description" content={seo.description} />
                        )}
                    </Helmet>
                </>
            )
        }} />
    );

    export default SEO

    const query = graphql`
        query SEO {
            site {
                siteMetadata {
                    defaultTitle: title
                    titleTemplate
                    defaultDescription: description
                    siteUrl: url
                    defaultImage: image
                }
            }
        }
    `
````

<br>
<br>
여기서 필요한 내용들을 추가하거나 빼면 된다.
<br>
meta 데이터 관련 내용은 다음 [링크]("https://steemit.com/kr/@reggie031/html-seo-web-coding")를 참고하였다.

<br>

## ○ 참고문서

<br>

### Gatsby 공식 페이지

<br>

* <https://www.gatsbyjs.org/docs/add-page-metadata/>
* <https://www.gatsbyjs.org/docs/add-seo-component/>


<br>
<br>
+ 코드 폰트들이 왜저런지...? 빠른 시일 내에 수정해야겠다.