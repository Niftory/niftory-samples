import { CheckIcon, EditIcon } from "@chakra-ui/icons"
import { useEditableControls, IconButton, Flex } from "@chakra-ui/react"

interface EditableControlsProps {
  onSave?: () => void
}

export const EditableControls = ({ onSave }: EditableControlsProps) => {
  const { isEditing, getSubmitButtonProps, getEditButtonProps } = useEditableControls()

  return isEditing ? (
    <IconButton
      aria-label="submit"
      ml="0.5rem"
      size="sm"
      icon={<CheckIcon />}
      {...getSubmitButtonProps()}
      onPointerDown={onSave}
    />
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="edit"
        ml="0.5rem"
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  )
}
