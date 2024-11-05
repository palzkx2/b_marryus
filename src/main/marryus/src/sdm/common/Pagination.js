import React from 'react';
import './pagination.css';

const Pagination = ({ pageResponse, onPageChange }) => {
    const {
        pageNumList, // 페이지 번호 리스트 (1 ~ 10 또는 11 ~ 20 등)
        prev, // 이전 버튼 활성화 여부
        next, // 다음 버튼 활성화 여부
        prevPage, // 이전 버튼 클릭 시 이동할 페이지 번호
        nextPage, // 다음 버튼 클릭 시 이동할 페이지 번호
        current, // 현재 페이지 번호
        totalPage, // 총 페이지 수
    } = pageResponse;

    // 페이지 번호 리스트가 비어있는 경우 기본값 설정
    const validPageNumList = pageNumList && pageNumList.length > 0 ? pageNumList : [1];

    return (
        <div className="sdmpagination">
            {/* Prev 버튼 */}
            {prev && (
                <button
                    className="sdmpage-btn"
                    onClick={() => onPageChange(prevPage)}
                    disabled={prevPage < 1}
                >
                    ◀
                </button>
            )}

            {/* 페이지 번호 버튼들 */}
            {validPageNumList.map((pageNum) => (
                <button
                    key={pageNum}
                    className={`sdmpage-btn ${pageNum === current ? 'active' : ''}`}
                    onClick={() => onPageChange(pageNum)}
                >
                    {pageNum}
                </button>
            ))}

            {/* Next 버튼 */}
            {next && (
                <button
                    className="sdmpage-btn"
                    onClick={() => onPageChange(nextPage)}
                    disabled={nextPage > totalPage}
                >
                    ▶
                </button>
            )}
        </div>
    );
};

export default Pagination;