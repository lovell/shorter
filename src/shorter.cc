#include <node.h>
#include <node_buffer.h>

#include "nan.h"
#include "shoco/shoco.h"

static const char shorterErrorMemory[] = "Memory allocated was shorter than necessary";

NAN_METHOD(compressBuffer) {
  Nan::HandleScope();

  const v8::Local<v8::Object> input = info[0].As<v8::Object>();
  const size_t inputLength = node::Buffer::Length(input);
  const size_t outputLengthMax = inputLength + 1;

  char *output = new char[outputLengthMax];
  size_t outputLength = shoco_compress(node::Buffer::Data(input), inputLength, output, outputLengthMax);

  if (outputLengthMax > outputLength) {
    info.GetReturnValue().Set(Nan::CopyBuffer(output, outputLength).ToLocalChecked());
    delete output;
  } else {
    delete output;
    Nan::ThrowError(shorterErrorMemory);
  }
}

NAN_METHOD(compressString) {
  Nan::HandleScope();

  const size_t inputLength = Nan::Utf8String(info[0]).length();
  const size_t outputLengthMax = inputLength + 1;

  char *output = new char[outputLengthMax];
  size_t outputLength = shoco_compress(*Nan::Utf8String(info[0]), inputLength, output, outputLengthMax);

  if (outputLengthMax > outputLength) {
    info.GetReturnValue().Set(Nan::CopyBuffer(output, outputLength).ToLocalChecked());
    delete output;
  } else {
    delete output;
    Nan::ThrowError(shorterErrorMemory);
  }
}

NAN_METHOD(decompress) {
  Nan::HandleScope();

  const v8::Local<v8::Object> input = info[0].As<v8::Object>();
  const size_t inputLength = node::Buffer::Length(input);
  const size_t outputLengthMax = inputLength * 3;

  char *output = new char[outputLengthMax];
  size_t outputLength = shoco_decompress(node::Buffer::Data(input), inputLength, output, outputLengthMax);

  if (outputLengthMax > outputLength) {
    info.GetReturnValue().Set(Nan::New(output, outputLength).ToLocalChecked());
    delete output;
  } else {
    delete output;
    Nan::ThrowError(shorterErrorMemory);
  }
}

NAN_MODULE_INIT(init) {
  Nan::Set(target, Nan::New("compressBuffer").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(compressBuffer)).ToLocalChecked());
  Nan::Set(target, Nan::New("compressString").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(compressString)).ToLocalChecked());
  Nan::Set(target, Nan::New("decompress").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(decompress)).ToLocalChecked());
}

NODE_MODULE(shorter, init)
