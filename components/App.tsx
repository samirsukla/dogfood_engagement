/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * Copyright 2019-2021 Bloomreach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrComponent, BrPage, BrPageContext } from '@bloomreach/react-sdk';
import { Configuration, PageModel } from '@bloomreach/spa-sdk';
import axios from 'axios';
import { Container, Navbar, Image, Row, Col } from 'react-bootstrap';
import { getCookieConsentValue } from 'react-cookie-consent';
import { useMemo, useState } from 'react';
import { CommerceApiClientFactory, CommerceConnectorProvider } from '@bloomreach/connector-components-react';
import { Cookies, CookiesProvider } from 'react-cookie';
import {
  BannerCollection,
  BannerCTA,
  BrCookieConsent,
  BrPixel,
  CategoryHighlight,
  Content,
  ContentPage,
  Link,
  Images,
  Map,
  Menu,
  MultiBannerCarousel,
  Navigation,
  PageCatalog,
  PathwaysRecommendations,
  Product,
  ProductGrid,
  ProductHighlight,
  SearchBar,
  SingleBannerCarousel,
  SingleBannerCarouselX,
  TitleAndText,
  Video,
} from '.';
import { CommerceContextProvider } from './CommerceContext';

import { Meta } from './Meta';
import { CommerceConfig } from '../src/utils';
import { Information } from './Information';
import { RestProduct } from './RestProduct';

interface AppProps {
  configuration: Omit<Configuration, 'httpClient'>;
  page: PageModel;
  commerceConfig: CommerceConfig;
  commerceClientFactory?: CommerceApiClientFactory;
  apolloState?: string;
  cookies?: Record<string, string>;
}

export function App({
                      configuration,
                      page,
                      commerceConfig,
                      commerceClientFactory,
                      apolloState,
                      cookies,
                    }: AppProps): JSX.Element {
  const [, setCookieConsentVal] = useState<boolean>();
  const mapping = {
    BannerCollection,
    BannerCTA,
    CategoryHighlight,
    Content,
    ContentPage,
    Images,
    Info: Information,
    Map,
    Menu,
    MultiBannerCarousel,
    Navigation,
    PageCatalog,
    PathwaysRecommendations,
    Product,
    ProductGrid,
    ProductHighlight,
    SingleBannerCarousel,
    SingleBannerCarouselX,
    SearchBar,
    TitleAndText,
    Video,
  };

  const updateCookieConsentVal = (val: boolean): void => {
    setCookieConsentVal(val);
  };

  const {
    graphqlServiceUrl,
    connector,
    discoveryAccountId,
    discoveryDomainKey,
    brAccountName: accountEnvId,
  } = commerceConfig;
  const defaultRequestHeaders = undefined;
  const defaultAnonymousCredentials = undefined;

  const factory = useMemo(() => {
    return commerceClientFactory ?? new CommerceApiClientFactory(
      graphqlServiceUrl,
      connector,
      accountEnvId,
      defaultRequestHeaders,
      defaultAnonymousCredentials,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphqlServiceUrl, connector, accountEnvId, defaultRequestHeaders, defaultAnonymousCredentials]);

  const reactCookies = cookies ? new Cookies(cookies) : undefined;

  return (
    <CookiesProvider cookies={reactCookies}>
      <CommerceConnectorProvider
        graphqlServiceUrl={graphqlServiceUrl}
        connector={connector}
        accountEnvId={accountEnvId}
        commerceClientFactory={factory}
        apolloState={apolloState}
      >
        <CommerceContextProvider commerceConfig={commerceConfig} commerceClientFactory={factory}>
          <div className="home-container">
            <div className="home-pacific-beauty-landingpage-personalized">
              <BrPage configuration={{ ...configuration, httpClient: axios as any }} mapping={mapping} page={page}>
                <BrPageContext.Consumer>
                  {(contextPage) => (
                    <>
                      <Meta page={contextPage!}/>
                      <div className="home-pacific-beauty-global-nav">
                        <div className="home-frame155">
                          <div className="home-frame160">
                            <div className="home-frame156">
                              <img
                                src="/playground_assets/unioni152-j6vqi.svg"
                                alt="UnionI152"
                                className="home-union"
                              />
                            </div>
                          </div>
                          <span className="home-text">
                          <span className="home-text001">PACIFIC</span>
                          <span>BEAUTY</span>
                        </span>
                          <div className="home-frame159">
                            <div className="home-frame1561">
                              <img
                                src="/playground_assets/unioni152-hp0h.svg"
                                alt="UnionI152"
                                className="home-union1"
                              />
                              <div className="home-shopping-basket-icon">
                                <img
                                  src="/playground_assets/vectori152-2hh.svg"
                                  alt="VectorI152"
                                  className="home-vector"
                                />
                                <img
                                  src="/playground_assets/vectori152-i0qk.svg"
                                  alt="VectorI152"
                                  className="home-vector1"
                                />
                                <img
                                  src="/public/playground_assets/vectori152-ckzh.svg"
                                  alt="VectorI152"
                                  className="home-vector2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Container as="section">
                        <BrComponent path="main">
                          <BrComponent/>
                        </BrComponent>
                      </Container>
                      <RestProduct/>
                      {<BrCookieConsent path={configuration.path ?? ''} csUpdate={updateCookieConsentVal}/>}
                    </>)}
                </BrPageContext.Consumer>
              </BrPage>
            </div>
          </div>
        </CommerceContextProvider>
      </CommerceConnectorProvider>
    </CookiesProvider>
  );
}
