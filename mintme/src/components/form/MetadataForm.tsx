import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Spacer,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { Field } from "formik"
import React from "react"
import { MdDelete as DeleteIcon } from "react-icons/md"

export interface Metadata {
  name: string
  flavorText: string
  rarity: string
  artists: string[]
  tags: string[]
  [key: string]: string | string[]
}

export const extractMetadata = (metadata) => {
  if (metadata == null) {
    return []
  }

  const { _name, _artists, _tags, ...rest } = metadata
  const shapedMetadata = []
  for (const [key, value] of Object.entries(rest)) {
    shapedMetadata.push({
      key: key,
      val: value,
    })
  }
  return shapedMetadata
}

export const metadataToJson = (metadata: any[]) => {
  if (!metadata || metadata.length === 0) {
    return
  }

  let encodedString = `{`
  let firstItem = true
  for (const metadataItem of metadata) {
    if (firstItem) {
      firstItem = false
    } else {
      encodedString += `,`
    }
    encodedString += `"${metadataItem.key}":"${metadataItem.val}"`
  }
  encodedString += `}`

  return JSON.parse(encodedString)
}

export const MetadataForm = (props: {
  arrayHelpers: { push: any; remove: any; name: any }
  values: { [field: string]: any }
}) => {
  const {
    arrayHelpers: { push, remove },
    values,
  } = props

  return (
    <Stack mt="4" w="100%">
      {values.metadata.length > 0 &&
        values.metadata.map((key, index) => (
          <Wrap key={index}>
            <WrapItem flex="1">
              <Field name={`metadata.${index}.key`}>
                {({ field }) => (
                  <FormControl id={`metadata.${index}.key`}>
                    <FormLabel fontSize="sm" htmlFor={`metadata.${index}.key`}>
                      Name
                    </FormLabel>
                    <Input
                      {...field}
                      variant="outline"
                      id={`metadata.${index}.key`}
                      placeholder={"Eyes"}
                      maxLength={50}
                      margin="0.5"
                      size="sm"
                      borderRadius="lg"

                      //isRequired
                    />
                    <FormErrorMessage>{`form.errors.metadata.${index}.key`}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </WrapItem>

            <WrapItem flex="1">
              <Field name={`metadata.${index}.val`}>
                {({ field }) => (
                  <FormControl id={`metadata.${index}.val`}>
                    <FormLabel fontSize="sm" htmlFor={`metadata.${index}.val`}>
                      Value
                    </FormLabel>
                    <Input
                      {...field}
                      variant="outline"
                      id={`metadata.${index}.val`}
                      placeholder={"Big"}
                      maxLength={50}
                      borderRadius="lg"
                      margin="0.5"
                      size="sm"
                    />
                    <FormErrorMessage>{`form.errors.metadata.${index}.val`}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </WrapItem>

            <WrapItem alignSelf="flex-end">
              <IconButton
                variant="primaryBold"
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => remove(index)}
              >
                ×
              </IconButton>
            </WrapItem>
          </Wrap>
        ))}
      <Flex>
        <Spacer />
        <Button
          alignSelf="center"
          justifySelf="center"
          variant="secondaryBold"
          mt="2"
          size="sm"
          onClick={() => push({ key: "", val: "" })}
        >
          + Add Item
        </Button>
      </Flex>
    </Stack>
  )
}
