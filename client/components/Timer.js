import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import i18n from 'i18n-js';

export default function Timer({deadline, start, style}) {
  const [timeDiff, setTimeDiff] = useState(deadline-new Date(Date.now()));
  const [waitDiff, setWaitDiff] = useState(start-new Date(Date.now()));
  const [time, setTime] = useState('');

  // useEffect(()=>{
  //   if (!time) {
  //     console.log('deadline is', deadline)
  //     console.log('startlin is', start)
  //     console.log('timeDiff is',timeDiff)
  //     console.log('waitDiff is',waitDiff)
  //   }
  // },[]);


  useEffect(()=>{
    let timer = setTimeout(()=>setTime(updateTime(timeDiff)), 1000);

    return ()=>{
      clearTimeout(timer);
    }
  },[timeDiff]);

  // function updateTime (diff) {
  //   setTimeDiff(timeDiff-1000);
  //   if (diff > 0) {

  //     const days=Math.floor(diff / (1000 * 60 * 60 * 24));
  //     const hours=Math.floor((diff / (1000 * 60 * 60)) % 24);
  //     const minutes=Math.floor((diff / 1000 / 60) % 60);
  //     const seconds=Math.floor((diff / 1000) % 60);

  //     if (days>0) {
  //       if (days===1) {
  //         return `${days} day ${hours} hrs`;
  //       }
  //       return `${days} days ${hours} hrs`;
  //     }

  //     if (hours>0) {
  //       if (hours===1) {
  //         return `${hours} hr ${minutes} mins`;
  //       }
  //       return `${hours} hrs ${minutes} mins`;
  //     }

  //     if (minutes>0) {
  //       if (minutes===1) {
  //         return `${minutes} min ${seconds} secs`;
  //       }
  //       return `${minutes} mins ${seconds} secs`;
  //     }

  //     if (seconds>0) {
  //       if (seconds===1) {
  //         return `${seconds} sec`;
  //       }
  //       return `${seconds} secs`;
  //     }
  //   } else {
  //     return `${i18n.t('ended')}`;
  //   }
  // }

  function updateTime (diff) {
    setTimeDiff(timeDiff-1000);
    if (diff > 0) {

      const days=Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours=Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes=Math.floor((diff / 1000 / 60) % 60);
      const seconds=Math.floor((diff / 1000) % 60);

      if (days>0) {
        if (days===1) {
          return `${days} ${i18n.t('day')} ${hours} ${i18n.t('hrs')}`;
        }
        return `${days} ${i18n.t('days')} ${hours} ${i18n.t('hrs')}`;
      }

      if (hours>0) {
        if (hours===1) {
          return `${hours} ${i18n.t('hr')} ${minutes} ${i18n.t('mins')}`;
        }
        return `${hours} ${i18n.t('hrs')} ${minutes} ${i18n.t('mins')}`;
      }

      if (minutes>0) {
        if (minutes===1) {
          return `${minutes} ${i18n.t('min')} ${seconds} ${i18n.t('secs')}`;
        }
        return `${minutes} ${i18n.t('mins')} ${seconds} ${i18n.t('secs')}`;
      }

      if (seconds>0) {
        if (seconds===1) {
          return `${seconds} ${i18n.t('sec')}`;
        }
        return `${seconds} ${i18n.t('secs')}`;
      }
    } else {
      return `${i18n.t('ended')}`;
    }
  }
  return (
    <Text style={style}>
      {time}
    </Text>
  );
}