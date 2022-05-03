import React from 'react';
import { Tag } from 'antd';

export function getLayout(pathname) {
  const nonAuthAccountsPaths = ['/accounts/settings'];

  if (pathname === '/') {
    return 'public';
  }
  if (/^\/accounts(?=\/|$)/i.test(pathname)) {
    if (!nonAuthAccountsPaths.includes(pathname)) {
      return 'login';
    }
  }
  return 'main';
}

export function getMenuItemTagStyle(type) {
  return type === 'FOOD'
    ? { color: '#fff', backgroundColor: '#43a744' }
    : { color: '#fff', backgroundColor: '#32cfcb' };
}

export function getItemTypeTagColor(status) {
  if (status === 'food') return '#43a744';
  if (status === 'drink') return '#32cfcb';
  return '#b4c3c1';
}

export function getItemTypeTagData(status) {
  return {
    type: status.toUpperCase(),
    color: getItemTypeTagColor(status),
  };
}

export function renderItemTypeTag(type) {
  const itemTagData = getItemTypeTagData(type);
  return <Tag color={itemTagData.color}>{itemTagData.type}</Tag>;
}
