{
  'targets': [{
    'target_name': 'shoco',
    'type': 'static_library',
    'sources': [
      'shoco/shoco.c'
    ],
    'cflags': [
      '-std=c99',
      '-fexceptions',
      '-Wall',
      '-march=native',
      '-Ofast'
    ],
    'xcode_settings': {
      'OTHER_CFLAGS': [
        '-std=c99',
        '-fexceptions',
        '-Wall',
        '-march=native',
        '-Ofast'
      ]
    }
  }]
}
