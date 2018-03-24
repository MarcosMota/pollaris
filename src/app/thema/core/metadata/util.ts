import "reflect-metadata";

const formatMetadataKey = Symbol("format");

export function format(formatString: any) {
    console.log(formatString);
  return Reflect.metadata(formatMetadataKey, formatString);
}

export function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

const columnMetadataKey = Symbol("column");

export function Column(formatString: any) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

export function getColumn(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
