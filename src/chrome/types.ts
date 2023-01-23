export type CommonMessage<TType extends string, TData, TResponse> = {
  type: TType;
  data: TData;
  _?: TResponse;
};

export type MessageResponse<T> = T extends CommonMessage<
  any,
  any,
  infer TResponse
>
  ? TResponse
  : unknown;

export type MessageData<T> = T extends CommonMessage<
  string,
  infer TMessage,
  any
>
  ? TMessage
  : unknown;
