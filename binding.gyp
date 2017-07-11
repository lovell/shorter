{
  'targets': [{
    'target_name': 'shorter',
    'sources': [
      'src/shorter.cc'
    ],
    'dependencies': [
      'src/shoco.gyp:shoco'
    ],
    'include_dirs': [
      '<!(node -e "require(\'nan\')")'
    ],
    'cflags_cc': [
      '-fexceptions',
      '-Wall',
      '-Ofast',
      '-flto',
    ],
    'conditions': [
      ['target_arch!="arm"', {
        'cflags_cc': [
          '-march=native'
        ]
      }]
    ],
    'xcode_settings': {
      'OTHER_CPLUSPLUSFLAGS': [
        '-fexceptions',
        '-Wall',
        '-march=native',
        '-Ofast',
      ]
    }
  }]
}
