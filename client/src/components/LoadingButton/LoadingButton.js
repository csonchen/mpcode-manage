import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

function LoadingButton(props = {}) {
  const { loading, className = "" } = props
  return (
    <Button 
      className={`flex-middle ${className}`}
      variant="primary"
      disabled={loading}
      onClick={!loading ? props.onClick : null}
    >
      {loading &&
      <Spinner className="mr3" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
      }
      {props.children}
    </Button>
  )
}

export default LoadingButton
