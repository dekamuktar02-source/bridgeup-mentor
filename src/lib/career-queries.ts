import { queryOptions } from '@tanstack/react-query';
import { getCatalog, getWorkspace } from './career.functions';
export const catalogOptions = queryOptions({queryKey:['catalog'],queryFn:()=>getCatalog(),staleTime:60000});
export const workspaceOptions = queryOptions({queryKey:['workspace'],queryFn:()=>getWorkspace(),staleTime:15000});
