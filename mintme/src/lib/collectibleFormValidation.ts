interface collectibleFormValidationProps {
  values: { [field: string]: any }
}

export const collectibleFormValidation = (props: collectibleFormValidationProps) => {
  const { values } = props

  const errors: { [field: string]: string } = {}
  let error: string

  const containsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
    return specialChars.test(str)
  }

  if (!values.title) {
    errors.title = "Title is required to continue"
    error = errors.title
  } else if (!values.description) {
    errors.description = "Description is required to continue"
    error = errors.description
  } else if (!values.numEntities) {
    errors.numEntities = "Supply is required to continue"
    error = errors.numEntities
  } else {
    if (!values.contentId) {
      errors.contentId = "Primary Content is required to continue"
      error = errors.contentId
    }
    if (containsSpecialChars(values.title)) {
      errors.title = "Title cannot contain special characters"
      error = errors.title
    }
    if (Number(values.numEntities ?? 0) > 1000) {
      errors.numEntities = "Supply should not exceed 1000"
      error = errors.numEntities
      console.log(error, errors)
    }
  }
  return { error, errors }
}
