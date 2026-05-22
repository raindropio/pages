import { parseISO } from 'date-fns'

export const parseDate = (d) => typeof d == 'string' ? parseISO(d) : d
