import { pick } from 'ramda'

export const convertRegisterResponseDTO = pick(['email', 'firstName', 'lastName', 'id'])
