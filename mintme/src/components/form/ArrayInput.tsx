import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
  Stack,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { MdDelete as DeleteIcon } from "react-icons/md"

export const ArrayInput = (props: {
  form: { setFieldValue: any }
  field: any
  meta: any
  arrayHelpers: { push: any; remove: any; name: any }
  initialValues: any
  formLabel: any
  helperText?: any
  isNewLayout?: boolean
  placeholder?: string
}) => {
  const [items, setItems] = useState([])
  const [value, setValue] = useState("")

  const {
    form: { setFieldValue },
    field,
    arrayHelpers: { push, remove, name },
    initialValues: arrayValues,
    formLabel,
    helperText,
    isNewLayout,
    placeholder,
  } = props

  useEffect(() => {
    if (typeof arrayValues !== "undefined" && arrayValues.length !== 0) {
      setItems(() => [...arrayValues])
    }
  }, [])

  const onKeyDown = (e) => {
    const { value } = e.target
    if (e.key === "Enter" && value) {
      e.preventDefault()
      if (items.find((item) => item.toLowerCase() === value.toLowerCase())) {
        return
      }
      setItems((prevItems) => [...prevItems, value])
      setFieldValue(field.name, value)
      push(value)
      setValue("")
    } else if (e.key === "Backspace" && !value) {
      removeItem(items[items.length - 1])
    }
  }

  const removeItem = (itemToRemove) => {
    const idx = items.indexOf(itemToRemove)
    remove(idx)
    const newItems = items.filter((item) => item !== itemToRemove)
    setItems(newItems)
  }
  if (isNewLayout) {
    return (
      <FormControl id={name}>
        <VStack alignItems="flex-start" py="1rem" spacing="0.25rem">
          {" "}
          <FormLabel fontWeight="semibold" my="auto" color="gray.600" fontSize="xl" htmlFor={name}>
            {formLabel}
          </FormLabel>
          <Spacer />
          <VStack spacing="1rem" w={{ base: "100%" }}>
            <Input
              variant="outline"
              size="lg"
              fontSize="xl"
              rounded="2xl"
              w="full"
              {...field}
              id={name}
              value={value}
              placeholder={placeholder ?? name}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
            />
            {items.length > 0 && (
              <Wrap alignSelf="start">
                {items.map((item) => (
                  <WrapItem fontWeight="medium" key={item} display="flex">
                    <Button rightIcon={<DeleteIcon />} size="sm" onClick={() => removeItem(item)}>
                      {item}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            )}
          </VStack>
        </VStack>

        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    )
  } else {
    return (
      <FormControl id={name}>
        <FormLabel htmlFor={name} fontSize="86%">
          {formLabel}
        </FormLabel>
        <Wrap>
          {items.map((item) => (
            <WrapItem key={item} display="flex" alignItems="center">
              {item}
              <Box padding="2px"></Box>
              <Button size="xs" onClick={() => removeItem(item)}>
                ×
              </Button>
              <Box padding="3px"></Box>
            </WrapItem>
          ))}
          <WrapItem flex="1 8em">
            <Input
              {...field}
              id={name}
              value={value}
              placeholder={name}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </WrapItem>
        </Wrap>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}
