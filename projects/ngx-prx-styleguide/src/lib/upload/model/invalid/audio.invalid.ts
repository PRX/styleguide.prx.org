import { AudioFileModel } from '../audio-file.model';
import { AudioVersionModel } from '../audio-version.model';
import { BaseInvalid } from '../../../model/base.invalid';
import { HalDoc } from '../../../hal/doc/haldoc';
import { DurationPipe } from '../../file';

const durationPipe = new DurationPipe();

/**
 * Audio version template validations
 */
export const VERSION_TEMPLATED = (template?: HalDoc): BaseInvalid => {
  return (key: string, version: AudioVersionModel, strict: boolean) => {
    const undeleted = version.files.filter(f => !f.isDestroy);
    const count = undeleted.length;

    // wait for processing to complete
    if (strict && version.files.some(f => f.isProcessing)) {
      return 'wait for uploads to finish processing';
    }

    // prevent publishing unless strict checks pass
    if (strict) {

      // segment count
      if (template && template.count('prx:audio-file-templates')) {
        const segments = template.count('prx:audio-file-templates');
        if (count !== segments) {
          return `you must upload ${segments} segments (got ${count})`;
        }
      } else if (count < 1) {
        return 'upload at least 1 segment';
      }

      // min duration
      const duration = undeleted.map(f => f.duration || 0).reduce((a, b) => a + b);
      if (template && template['lengthMinimum'] && duration < template['lengthMinimum']) {
        const min = durationPipe.transform(template['lengthMinimum']);
        const got = durationPipe.transform(duration);
        return `total length must be greater than ${min} - currently ${got}`;
      }

      // max duration
      if (template && template['lengthMaximum'] && duration > template['lengthMaximum']) {
        const max = durationPipe.transform(template['lengthMaximum']);
        const got = durationPipe.transform(duration);
        return `total length must be less than ${max} - currently ${got}`;
      }

      // file formats must match
      const nonMatches = [];
      const labels = {contenttype: 'content type', channelmode: 'channels'};
      ['contenttype', 'layer', 'frequency', 'bitrate', 'channelmode'].forEach(fld => {
        let vals = undeleted.map(f => f[fld]).filter(val => val);
        vals = vals.filter((val, idx) => vals.indexOf(val) === idx);
        if (vals.length > 1) {
          nonMatches.push(labels[fld] || fld);
        }
      });
      if (nonMatches.length) {
        return `Non-matching audio files (${nonMatches.join(' / ')})`;
      }

    }

    return null;
  };
};

/**
 * Audio file template validations
 */
export const FILE_TEMPLATED = (versionTemplate?: HalDoc, template?: HalDoc): BaseInvalid => {
  return (key: string, file: AudioFileModel) => {

    // loosely match content type
    if (versionTemplate && versionTemplate['contentType']) {
      // also allows 'mpeg': some files dont have metadata to be aurora validated and are tripped up from our native audio validation
      if (versionTemplate['contentType'] === 'audio/mpeg' && file.format && !(file.format === 'mp3' || file.format === 'mpeg')) {
        return 'not an mp3 file';
      } else if (versionTemplate['contentType'].match(/audio/) && (file.duration === null || file.duration === undefined)) {
        return 'not an audio file';
      } else if (versionTemplate['contentType'].match(/video/)) {
        // just bypass for now
      }
    }

    // min duration
    if (template && template['lengthMinimum'] && file.duration < template['lengthMinimum']) {
      const min = durationPipe.transform(template['lengthMinimum']);
      const got = durationPipe.transform(file.duration);
      return `length must be greater than ${min} - currently ${got}`;
    }

    // max duration
    if (template && template['lengthMaximum'] && file.duration > template['lengthMaximum']) {
      const max = durationPipe.transform(template['lengthMaximum']);
      const got = durationPipe.transform(file.duration);
      return `length must be less than ${max} - currently ${got}`;
    }

    return null;
  };
};
