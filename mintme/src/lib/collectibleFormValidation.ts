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
  } else {
    if (!values.contentId) {
      errors.contentId = "Primary Content is required to continue"
      error = errors.contentId
    }
    if (containsSpecialChars(values.title)) {
      errors.title = "Title cannot contain special characters"
      error = errors.title
    }
  }
  return { error, errors }
}
