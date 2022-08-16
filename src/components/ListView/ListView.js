import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Container, Row, Col, Image } from 'react-bootstrap';

import ArrowNextDis from '../../../public/icon/ic_arrow_next_dis.svg';
import ArrowBackEn from '../../../public/icon/ic_arrow_prev_en.svg';
import ArrowNextEn from '../../../public/icon/ic_arrow_next_en.svg';
import ArrowBackDis from '../../../public/icon/ic_arrow_prev_dis.svg';

import { MockEmptySpace } from '../mock/MockEmptySpace';

import { BlurOverlay } from '../ui/overlay/blur';

import { PARAM_LIMIT_SMALL } from '../../constants/API';

import { SkeletonHorizontal } from '../widgets/Skeletons';

export const ListView = (props) => {
  const {
    title,
    titleUrl,
    nextEnable,
    prevEnable,
    onNext,
    onPrev,
    isLoading = false,
    skeleton: Skeleton = SkeletonHorizontal,
    itemsInRow = PARAM_LIMIT_SMALL,
    isWhite = false,
    isCommingSoon,
    hasNavigion = true,
    isOnBoard = false,
  } = props;

  const content = (
    <Row>
      {isLoading ? (
        Array(itemsInRow)
          .fill(0)
          .map((_, index) => <Skeleton key={index} />)
      ) : props.children.length > 0 ? (
        props.children
      ) : (
        <MockEmptySpace width={250} />
      )}
    </Row>
  );

  const navigation = (
    <Col className="d-flex justify-content-end">
      <button
        type="button"
        className="button-img-svg"
        onClick={onPrev}
        disabled={!prevEnable}
      >
        {prevEnable ? <ArrowBackEn /> : <ArrowBackDis />}
      </button>
      <button
        type="button"
        className="button-img-svg"
        onClick={onNext}
        disabled={!nextEnable}
      >
        {nextEnable ? <ArrowNextEn /> : <ArrowNextDis />}
      </button>
    </Col>
  );

  const titleElem = titleUrl ? (
    <Link href={titleUrl}>
      <p className="text-title clickable">{title}</p>
    </Link>
  ) : (
    <p className="text-title clickable">{title}</p>
  );

  return (
    <Container
      // style={{
      //   minHeight: `${props.itemsInRow === 4 ? '350px' : '480px'}`,
      // }}
      className={classNames(isWhite ? 'bg-white' : '', isOnBoard ? '' : 'py-5')}
    >
      <Row className="d-flex mb-3">
        <Col className="d-flex justify-content-start">{titleElem}</Col>
        {hasNavigion && navigation}
      </Row>
      {isCommingSoon ? <BlurOverlay>{content}</BlurOverlay> : content}
    </Container>
  );
};
