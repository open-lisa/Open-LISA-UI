import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import InstrumentCard from '../InstrumentCard/InstrumentCard';

function InstrumentsList({ instruments }) {
  return (
    <Flex gap={12} wrap="wrap" justify="start">
      {instruments.map((instrument) => (
        <InstrumentCard key={instrument.id} {...instrument} />
      ))}
    </Flex>
  );
}

InstrumentsList.propTypes = {
  instruments: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ),
};

export default InstrumentsList;