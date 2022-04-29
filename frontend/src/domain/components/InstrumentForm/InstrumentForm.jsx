import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Code,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import useDetectedPhysicalAddresses from '../../../hooks/useDetectedPhysicalAddresses';
import useInstrumentImages from '../../../hooks/useInstrumentImages';
import { INSTRUMENT_FIELD_NAMES, NONE_IMAGE_FILE_NAME } from '../../constants';
import ImageSelector from './components/ImageSelector';
import { brandValidator } from './validators/brandValidator';
import { modelValidator } from './validators/modelValidator';

const OTHER_PHYSICAL_ADDRESS_VALUE = 'OTHER';
const OTHER_PHYSICAL_ADDRESS = {
  label: 'Otra',
  value: OTHER_PHYSICAL_ADDRESS_VALUE,
};

export const InstrumentFormFileds = [
  {
    name: INSTRUMENT_FIELD_NAMES.BRAND,
    getError: brandValidator,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.MODEL,
    getError: modelValidator,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.DESCRIPTION,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.IMAGE,
    defaultValue: NONE_IMAGE_FILE_NAME,
  },
];

export default function InstrumentForm({ updateField, values, errors }) {
  const { data: detectedPhysicalAddresses, isLoading: loadingDetectedPhysicalAddresses } =
    useDetectedPhysicalAddresses();
  const { data: instrumentImages, isLoading: loadingInstrumentImages } = useInstrumentImages();
  const physicalAddressInput = useRef(null);

  if (loadingDetectedPhysicalAddresses || loadingInstrumentImages) return null;

  return (
    <form>
      <VStack spacing={6} align="start">
        <FormControl isRequired isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.BRAND])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.BRAND}>Marca</FormLabel>
          <Input
            type="text"
            value={values[INSTRUMENT_FIELD_NAMES.BRAND]}
            id={INSTRUMENT_FIELD_NAMES.BRAND}
            onChange={(e) => updateField(INSTRUMENT_FIELD_NAMES.BRAND)(e.target.value)}
          />
          {errors[INSTRUMENT_FIELD_NAMES.BRAND] ? (
            <FormErrorMessage>{errors[INSTRUMENT_FIELD_NAMES.BRAND]}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.MODEL])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.MODEL}>Modelo</FormLabel>
          <Input
            type="text"
            value={values[INSTRUMENT_FIELD_NAMES.MODEL]}
            id={INSTRUMENT_FIELD_NAMES.MODEL}
            onChange={(e) => updateField(INSTRUMENT_FIELD_NAMES.MODEL)(e.target.value)}
          />
          {errors[INSTRUMENT_FIELD_NAMES.MODEL] ? (
            <FormErrorMessage>{errors[INSTRUMENT_FIELD_NAMES.MODEL]}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl
          as="fieldset"
          isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS])}
        >
          <FormLabel as="legend" htmlFor={INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS}>
            Instrumentos detectados
          </FormLabel>
          <RadioGroup
            value={values[INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS]}
            id={INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS}
            onChange={(value) => {
              updateField(INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS)(value);
              if (value !== OTHER_PHYSICAL_ADDRESS_VALUE) {
                updateField(INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS)(value);
              } else {
                updateField(INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS)('');
                physicalAddressInput.current.focus();
              }
            }}
          >
            <VStack spacing={2} align="start">
              {[...detectedPhysicalAddresses, OTHER_PHYSICAL_ADDRESS].map(
                (physicalAddress, index) => (
                  <Radio key={physicalAddress.value} value={physicalAddress.value}>
                    {index === detectedPhysicalAddresses.length ? (
                      physicalAddress.label
                    ) : (
                      <Code>{physicalAddress.label}</Code>
                    )}
                  </Radio>
                ),
              )}
            </VStack>
          </RadioGroup>
        </FormControl>

        <FormControl isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS}>Dirección física</FormLabel>
          <Input
            ref={physicalAddressInput}
            type="text"
            readOnly={
              values[INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS] !==
              OTHER_PHYSICAL_ADDRESS_VALUE
            }
            placeholder="Seleccione una de las direcciones detectadas"
            value={values[INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS]}
            id={INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS}
          />
        </FormControl>

        <FormControl isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.DESCRIPTION])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.DESCRIPTION}>Descripción</FormLabel>
          <Textarea
            placeholder="Ingrese opcionalmente un detalle sobre el instrumento"
            value={values[INSTRUMENT_FIELD_NAMES.DESCRIPTION]}
            id={INSTRUMENT_FIELD_NAMES.DESCRIPTION}
            onChange={(e) => updateField(INSTRUMENT_FIELD_NAMES.DESCRIPTION)(e.target.value)}
          />
        </FormControl>

        <FormControl isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.IMAGE])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.IMAGE}>Elija una imagen</FormLabel>
          <ImageSelector
            value={values[INSTRUMENT_FIELD_NAMES.IMAGE]}
            id={INSTRUMENT_FIELD_NAMES.IMAGE}
            onChange={(value) => updateField(INSTRUMENT_FIELD_NAMES.IMAGE)(value)}
            images={instrumentImages}
          />
        </FormControl>
      </VStack>
    </form>
  );
}

InstrumentForm.propTypes = {
  updateField: PropTypes.func.isRequired,
  values: PropTypes.shape(
    InstrumentFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string.isRequired,
      }),
      {},
    ),
  ),
  errors: PropTypes.shape(
    InstrumentFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string,
      }),
      {},
    ),
  ),
};