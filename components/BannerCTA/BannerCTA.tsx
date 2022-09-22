/*
 * Copyright 2021 Bloomreach
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

import React from 'react';
import { Button } from 'react-bootstrap';
import { ContainerItem, Document, getContainerItemContent, Reference } from '@bloomreach/spa-sdk';
import { BrProps } from '@bloomreach/react-sdk';
import { Link } from '../Link';
import { BrRichTextContent } from '../BrRichTextContent';

interface BannerCTACompound {
  title?: string;
  content?: Content;
  cta?: string;
  link?: Reference;
}

export function BannerCTA({ component, page }: BrProps<ContainerItem>): React.ReactElement | null {
  const { title, content, cta, link } = getContainerItemContent<BannerCTACompound>(component, page) ?? {};
  const document = link && page?.getContent<Document>(link);

  return (
    <>
      {title && <h3 className="mb-2">{title}</h3>}
      {content && <BrRichTextContent page={page!} content={{ html: content.value }}/>}
      {cta && (
        <Button as={Link} href={document?.getUrl()} variant="light" className="text-primary mt-3">
          {cta}
        </Button>
      )}
    </>
  );
}
